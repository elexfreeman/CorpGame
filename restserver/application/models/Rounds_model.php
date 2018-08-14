<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Rounds_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);

    }

    /*список роундов игры*/
    public function getRoundsList()
    {
        $sql = "select * from rounds c where (c.deleted=0) order by id desc";
        $query = $this->db->query($sql);
        return $query->result_array();
    }

    /*текущий раунд*/
    public function getCurentRound()
    {
        $sql = "select * from rounds c where (c.deleted=0)and(c.status=1) limit 1";
        $query = $this->db->query($sql);
        return $query->row_array();
    }


    public function updateRound($id, $data)
    {
        $this->db->reset_query();
        $this->db->where('id', $id);
        $this->db->update('rounds', $data);
    }


    /**************************/
    /*ЦЕЛИ (уровни)*/
    /**************************/

    /*список роундов игры*/
    public function getGoalsList($round_id)
    {
        $sql = "select * from goals g where (g.deleted=0)and(g.round_id=?) order by goal";
        $query = $this->db->query($sql, array($round_id));
        return $query->result_array();
    }

    /*Конечная цль*/
    public function getFinishGoal($round_id)
    {
        $sql = "select * from goals g where (g.deleted=0)and(g.round_id=?) order by goal desc limit 1";
        $query = $this->db->query($sql, array($round_id));
        return $query->row_array();
    }

    public function updateGoal($id, $data)
    {
        $this->db->reset_query();
        $this->db->where('id', $id);
        $this->db->update('goals', $data);
    }

    public function addGoal($data)
    {
        $this->db->insert('goals', $data);
        $id = $this->db->insert_id();
        return $id;
    }


}
