<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Afisha_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);
    }


    public function sendAfisha($data)
    {
        $this->db->insert('afisha', $data);
        $like_id = $this->db->insert_id();
        return $like_id;
    }

    public function getList($offset, $limit)
    {
        $sql = "select a.*, u.name, u.photoUrl from afisha a
                join users u
                on u.id=a.user_id                
                where a.published=1                
                order by id desc limit ?, ?";

        $query = $this->db->query($sql, [$offset, $limit]);
        return $query->result_array();
    }

    public function get($afisha_id)
    {
        $sql = "select a.*, u.name, u.photoUrl from afisha a
                join users u
                on u.id=a.user_id                
                where (a.published=1)and(a.id=?)";

        $query = $this->db->query($sql, [$afisha_id]);
        return $query->row_array();
    }


}
