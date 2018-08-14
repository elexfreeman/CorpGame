<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('users_model');
    }

    public function index()
    {
        echo 'cool';
    }


    public function getMembersListTotalScore()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;

        if (!isset($_POST['apikey'])) {
            $res['error'] = true;
        } else {
            $res['user'] = $this->user_model->GetUserInfoByApiKey($_POST['apikey']);
            if (!isset($res['user'])) {
                $res['error'] = true;
            } else {
                unset($res['user']['password']);
                unset($res['user']['apikey']);
                $limit = 10000;
                if(isset($_POST['limit'])){
                    $limit = 5;
                }
                $res['members'] = $this->users_model->getMembersListTotalScore($limit);
            }
        }
        echo json_encode($res);
    }



    public function getMembersMembersLikes()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;

        if (!isset($_POST['apikey'])) {
            $res['error'] = true;
        } else {
            $res['user'] = $this->user_model->GetUserInfoByApiKey($_POST['apikey']);
            if (!isset($res['user'])) {
                $res['error'] = true;
            } else {
                unset($res['user']['password']);
                unset($res['user']['apikey']);
                $limit = 10000;
                if(isset($_POST['limit'])){
                    $limit = 5;
                }
                $res['members'] = $this->users_model->getMembersMembersLikes($limit);
            }
        }
        echo json_encode($res);
    }


}
