<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Wishes_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);

    }


    public function sendWish($data)
    {
        $this->db->insert('wishes', $data);
        $like_id = $this->db->insert_id();
        return $like_id;
    }

    public function getWishes($offset, $limit = 20)
    {
        $res = [];
        $sql = "select 
            w.*
            ,u.name
            ,u.photoUrl
            From wishes w
            
            join users u
            on u.id=w.user_id ";

        $query = $this->db->query($sql . " order by w.id desc limit ?, ?", [$offset, $limit]);
        $res['rows'] = $query->result_array();


        $query = $this->db->query("select count(*) cc from (".$sql.") d ");
        $res['total'] = $query->row_array();
        $res['total'] = $res['total']['cc'];

        return $res;
    }


}
