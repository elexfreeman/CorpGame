<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Wall_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);

    }

    /*стена юзера*/
    public function getUserWall($user_whom, $offset)
    {
        $sql = "select 

            authors.name author_name
            ,authors.photoUrl author_photoUrl
            
            ,whom.name whom_name
            ,whom.photoUrl whom_photoUrl
            ,(select count(*)+1 cc from likes ll where ll.parent=l.id) likes_count
            ,l.*
              ,lr.coef
           ,lr.caption lr_caption
            from likes l
            
            join users authors
            on authors.id=l.author
            
         join users whom
          on whom.id=l.user_whom
          
            join like_rules lr
           on lr.id=l.rule
            
            where 
            (l.user_whom=?)
            and(l.parent=0)
            
            order by l.id desc limit ?, 10";
        $query = $this->db->query($sql, [$user_whom, $offset]);
        $res = $query->result_array();
        if (isset($res)) {
            foreach ($res as $key => $val) {
                $res[$key]['images'] = $this->getWallLikeImages($res[$key]['id']);
            }
        }
        return $res;
    }

    /*стена юзера*/
    public function getUserOnlyWall($user_whom, $offset)
    {
        $sql = "select 

            authors.name author_name
            ,authors.photoUrl author_photoUrl
            
            ,whom.name whom_name
            ,whom.photoUrl whom_photoUrl
            ,(select count(*)+1 cc from likes ll where ll.parent=l.id) likes_count
            ,l.*
            ,lr.coef
            ,lr.caption lr_caption
            from likes l
            
            join users authors
            on authors.id=l.author
            
           join users whom
           on whom.id=l.user_whom
          
           join like_rules lr
           on lr.id=l.rule
            
            where 
            (l.user_whom=?)
            and(l.author=?)
            and(l.parent=0)
            
            order by l.id desc limit ?, 10";
        $query = $this->db->query($sql, [$user_whom, $user_whom, $offset]);
        $res = $query->result_array();
        if (isset($res)) {
            foreach ($res as $key => $val) {
                $res[$key]['images'] = $this->getWallLikeImages($res[$key]['id']);
            }
        }
        return $res;
    }

    /*стена юзера*/
    public function getUserWallItem($like_id)
    {
        $like_id = (int)$like_id;
        $sql = "select 

            authors.name author_name
            ,authors.photoUrl author_photoUrl
            
            ,whom.name whom_name
            ,whom.photoUrl whom_photoUrl
            ,(select count(*)+1 cc from likes ll where ll.parent=l.id) likes_count
            ,l.*
              ,lr.coef
              ,lr.caption lr_caption
            from likes l
            
            join users authors
            on authors.id=l.author
            
         join users whom
          on whom.id=l.user_whom
          
            join like_rules lr
            on lr.id=l.rule
            
            where 
            l.id=?";
        $query = $this->db->query($sql, [$like_id]);
        $res = $query->row_array();


        $res['images'] = $this->getWallLikeImages($res['id']);


        return $res;
    }


    public function getWallLikeImages($like_id)
    {
        $sql = "select * from like_images ll where ll.like_id = ?";
        $query = $this->db->query($sql, [$like_id]);
        return $query->result_array();

    }

    /*стена юзера*/
    public function getWallItemComments($wall_item_id)
    {
        $sql = "SELECT 

             authors.name author_name
            ,authors.photoUrl author_photoUrl
             
            ,whom.name whom_name
            ,whom.photoUrl whom_photoUrl
            
            ,l.*
            ,lr.coef
            ,lr.caption lr_caption
              
            FROM likes l
            
            JOIN users authors ON authors.id=l.author
            JOIN users whom ON whom.id=l.user_whom
            
            join like_rules lr
            on lr.id=l.rule
            
            WHERE l.parent = ?
            ORDER BY l.id asc";

        $query = $this->db->query($sql, [$wall_item_id]);
        $res = $query->result_array();

        if (isset($res)) {
            foreach ($res as $key => $val) {
                $res[$key]['images'] = $this->getWallLikeImages($res[$key]['id']);
            }
        }
        return $res;
    }


    /*стена юзера*/
    public function getWall2ItemComments($wall_item_id)
    {
        $sql = "select * from (
              SELECT 

             authors.name author_name
            ,authors.photoUrl author_photoUrl
             
            ,whom.name whom_name
            ,whom.photoUrl whom_photoUrl
            
            ,l.*
            ,lr.coef
            ,lr.caption lr_caption
              
            FROM likes l
            
            JOIN users authors ON authors.id=l.author
            JOIN users whom ON whom.id=l.user_whom
            
            join like_rules lr
            on lr.id=l.rule
            
            WHERE l.parent = ?
            ORDER BY l.id desc limit 2

          ) dd  order by id asc";


        $query = $this->db->query($sql, [$wall_item_id]);
        $res = $query->result_array();

        if (isset($res)) {
            foreach ($res as $key => $val) {
                $res[$key]['images'] = $this->getWallLikeImages($res[$key]['id']);
            }
        }
        return $res;
    }


    public function updateLike($like_id, $arg)
    {
        $this->db->where('id', $like_id);
        $this->db->update('likes', $arg);
    }

    public function deleteLike($like_id)
    {
        $this->db->where('id', $like_id);
        $this->db->update('likes', ['rule' => 6]);
        $this->db->reset_query();
        $this->db->where('parent', $like_id);
        $this->db->update('likes', ['rule' => 6]);
    }

    public function insertImg($like_id, $data)
    {

    }

    public function sendLike($data)
    {
        $this->db->insert('likes', $data);
        $like_id = $this->db->insert_id();


        if ((isset($_FILES)) and (count($_FILES) > 0)) {
            foreach ($_FILES as $key => $file) {

                /*генерим случайную строку*/
                $rnd = $this->functions->PassGen();
                /*составляем имя файла из рнд строки и расширения*/
                /*todo распределять по каталогам*/

                $info = new SplFileInfo($file['name']);

                $img = $rnd . '.' . $info->getExtension();
                $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/img/likes_images/" . $img;

                if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
                    $this->db->reset_query();
                    $this->db->insert('like_images', array(
                        'like_id' => $like_id
                    , 'img' => "/img/likes_images/" . $img
                    ));
                }

            }
        }
        return $like_id;
    }


    /*стена юзера*/
    public function getActivityWall($user_id, $offset)
    {
        $sql = "SELECT 

             authors.name author_name
            ,authors.photoUrl author_photoUrl
             
            ,whom.name whom_name
            ,whom.photoUrl whom_photoUrl
            ,(
            SELECT COUNT(*)+1 cc
            FROM likes ll
            WHERE ll.parent=l.id) likes_count
            ,l.*
            ,lr.coef
            ,lr.caption lr_caption
            
            FROM likes l
            JOIN users authors ON authors.id=l.author
            JOIN users whom ON whom.id=l.user_whom
            
            join like_rules lr
            on lr.id=l.rule
            
            WHERE 
             (l.parent=0)
              
            ORDER BY l.id DESC
            LIMIT ?, 10";
        $query = $this->db->query($sql, [$offset]);
        $res = $query->result_array();
        if (isset($res)) {
            foreach ($res as $key => $val) {
                $res[$key]['images'] = $this->getWallLikeImages($res[$key]['id']);
            }
        }
        return $res;
    }

}
