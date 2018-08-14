<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Afisha extends CI_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('afisha_model');
    }

    public function index()
    {
        echo 'cool';
        //test

    }

    
    public function sendAfisha()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['errors'] = [];
        $res['files'] = $_FILES;
        if (!isset($_POST['apikey'])) {
            $res['error'] = true;
        } else {
            $res['user'] = $this->user_model->GetUserInfoByApiKey($_POST['apikey']);
            if (!isset($res['user'])) {
                $res['error'] = true;
            } else {
                unset($res['user']['password']);
                unset($res['user']['apikey']);
                unset($res['user']['hash']);

                $res['error'] = false;

                if (!isset($_POST['afisha'])) {
                    $_POST['errors']['afisha'] = 0;
                }
                if (!isset($_POST['title'])) {
                    $_POST['errors']['title'] = 0;
                }


                if (!$res['error']) {
                    $data = array(
                        'afisha' => $_POST['afisha']
                    , 'title' => $_POST['title']
                    , 'user_id' => $res['user']['id']
                    );
                    $res['afisha_id'] = $this->afisha_model->sendAfisha($data);
                }

            }
        }
        echo json_encode($res);
    }


    public function getList()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['errors'] = [];
        $res['files'] = $_FILES;
        if (!isset($_POST['apikey'])) {
            $res['error'] = true;
        } else {
            $res['user'] = $this->user_model->GetUserInfoByApiKey($_POST['apikey']);
            if (!isset($res['user'])) {
                $res['error'] = true;
            } else {
                unset($res['user']['password']);
                unset($res['user']['apikey']);
                unset($res['user']['hash']);

                $res['error'] = false;

                $limit = 5;
                if (isset($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }

                $offset = 0;
                if (isset($_POST['offset'])) {
                    $offset = $_POST['offset'];
                }

                if (!$res['error']) {
                    $res['afisha'] = $this->afisha_model->getList($offset, $limit);
                }

            }
        }
        echo json_encode($res);
    }


    public function get()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['errors'] = [];
        $res['files'] = $_FILES;
        if (!isset($_POST['apikey'])) {
            $res['error'] = true;
        } else {
            $res['user'] = $this->user_model->GetUserInfoByApiKey($_POST['apikey']);
            if (!isset($res['user'])) {
                $res['error'] = true;
            } else {
                unset($res['user']['password']);
                unset($res['user']['apikey']);
                unset($res['user']['hash']);

                $res['error'] = false;

                if (!isset($_POST['afisha_id'])) {
                    $res['error'] = true;
                }

                if (!$res['error']) {
                    $res['afisha'] = $this->afisha_model->get((int)$_POST['afisha_id']);
                }

            }
        }
        echo json_encode($res);
    }


}
