<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Company_values extends CI_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('company_values_model');
    }

    public function index()
    {
        echo 'cool';
    }


    public function getList()
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

                $res['values'] = $this->company_values_model->getList();
            }
        }
        echo json_encode($res);
    }

    public function deleted()
    {
        // $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['files'] = $_FILES;
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

                if ((int)$res['user']['group'] == 2) {
                    $this->company_values_model->update((int)$_POST['id'], array(
                        'deleted' => 1
                    ));
                } else {
                    $res['error'] = true;
                }
            }
        }
        echo json_encode($res);
    }


    public function update()
    {
        // $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['files'] = $_FILES;
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

                if ((int)$res['user']['group'] == 2) {
                    $this->company_values_model->update((int)$_POST['id'], array(
                        'caption' => $_POST['caption']
                    , 'description' => $_POST['description']
                    ));
                } else {
                    $res['error'] = true;
                }
            }
        }
        echo json_encode($res);
    }

    public function add()
    {
        // $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['files'] = $_FILES;
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

                if ((int)$res['user']['group'] == 2) {
                    $this->company_values_model->add(array(
                        'caption' => $_POST['caption']
                    , 'description' => $_POST['description']
                    ));
                } else {
                    $res['error'] = true;
                }
            }
        }
        echo json_encode($res);
    }


}
