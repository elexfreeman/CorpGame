<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Import_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);
        $this->db_old = $this->load->database('old_db', TRUE);

    }


    public function sendLike($data)
    {
        $this->db->insert('likes', $data);
        return $this->db->insert_id();
    }


    public function getPostsFromOld()
    {
        $sql = "select * From posts";

        $query = $this->db_old->query($sql);
        return $query->result_array();
    }

    public function getOldLikes($post_id)
    {
        $sql = "select * From likes where post = ?";

        $query = $this->db_old->query($sql, [$post_id]);
        return $query->result_array();
    }


    public function import()
    {
        $sql = "TRUNCATE `likes`;";
        $this->db->query($sql);

        $old_posts = $this->getPostsFromOld();
        foreach ($old_posts as $old_post) {
            /*вставяем лайк в новую базу*/
            $like = [];
            $like['content'] = $old_post['text'];
            $like['i_date'] = $old_post['date'];

            /*правило*/
            if ((int)$old_post['category'] == 1) {
                $like['rule'] = 1;
            }

            if ((int)$old_post['category'] == 2) {
                $like['rule'] = 4;
            }

            if ((int)$old_post['category'] == 3) {
                $like['rule'] = 2;
            }

            if ((int)$old_post['category'] == 4) {
                $like['rule'] = 3;
            }

            $like['parent'] = 0;
            $like['author'] = $old_post['author'];
            $like['user_whom'] = $old_post['whom'];
            $this->sendLike($like);
            print_r($like);

            $old_likes = $this->getOldLikes($old_post['id']);
            foreach ($old_likes as $old_like) {
                $like = [];
                $like['content'] = $old_like['text'];
                $like['i_date'] = $old_like['date'];


                /*правило*/
                if ((int)$old_like['group'] == 1) {
                    $like['rule'] = 1;
                }

                if ((int)$old_like['group'] == 2) {
                    $like['rule'] = 4;
                }

                if ((int)$old_like['group'] == 3) {
                    $like['rule'] = 2;
                }

                if ((int)$old_like['group'] == 4) {
                    $like['rule'] = 3;
                }

                $like['parent'] = $old_post['id'];
                $like['author'] = $old_like['user_author'];
                $like['user_whom'] = $old_like['user_whom'];
                $this->sendLike($like);
                print_r($like);
            }

        }


    }


}
