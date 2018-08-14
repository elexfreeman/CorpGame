<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Wishes extends CI_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('wishes_model');
    }

    public function index()
    {
        echo 'cool';
    }


    public function sendWish()
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

                if (!isset($_POST['wish'])) {
                    $_POST['errors']['wish'] = 0;
                }


                if (!$res['error']) {
                    $data = array(
                        'wish' => $_POST['wish']
                    , 'user_id' => $res['user']['id']
                    );
                    $res['wish_id'] = $this->wishes_model->sendWish($data);
                }

            }
        }
        echo json_encode($res);
    }


    public function getWishes()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['error'] = false;
        $res['errors'] = [];
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

                if (!isset($_POST['offset'])) {
                    $_POST['errors']['offset'] = 0;
                }

                $res['wishes'] = $this->wishes_model->getWishes((int)$_POST['offset']);
            }
        }
        echo json_encode($res);
    }


}
