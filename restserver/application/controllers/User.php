<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');

        $this->load->library('sendemail');
    }

    public function index()
    {
        echo 'cool';
    }


    /*регенерирует ключи для юзеров*/
    public function regenApiKeys()
    {
        //  $this->user_model->regen_apikeys();
    }

    public function getUserInfo()
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
            }
        }
        echo json_encode($res);
    }


    public function updateUserInfo()
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

                /*обновляем инфу*/
                $data = [];
                if (isset($_POST['data']['name'])) {
                    $data['name'] = $_POST['data']['name'];
                }
                if (isset($_POST['data']['about'])) {
                    $data['about'] = $_POST['data']['about'];
                }
                if (isset($_POST['data']['city'])) {
                    $data['city'] = $_POST['data']['city'];
                }
                if (isset($_POST['data']['education'])) {
                    $data['education'] = $_POST['data']['education'];
                }
                if (isset($_POST['data']['instagram'])) {
                    $data['instagram'] = $_POST['data']['instagram'];
                }
                if (isset($_POST['data']['phone'])) {
                    $data['phone'] = $_POST['data']['phone'];
                }
                if (isset($_POST['data']['email'])) {
                    $data['email'] = $_POST['data']['email'];
                }
                if (isset($_POST['data']['vk'])) {
                    $data['vk'] = $_POST['data']['vk'];
                }
                if (isset($_POST['data']['hobby'])) {
                    $data['hobby'] = $_POST['data']['hobby'];
                }
                if (isset($_POST['data']['book'])) {
                    $data['book'] = $_POST['data']['book'];
                }
                if (isset($_POST['data']['question'])) {
                    $data['question'] = $_POST['data']['question'];
                }
                if (isset($_POST['data']['birthday'])) {
                    $data['birthday'] = $_POST['data']['birthday'];
                }

                $this->user_model->updateUserInfo($res['user']['id'], $data);
            }
        }
        echo json_encode($res);
    }

    public function deleteUser()
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

                if ((int)$res['user']['group'] == 2) {
                    $this->user_model->UpdateUser((int)$_POST['user_id'], array(
                        'group'=>0
                    ));
                }
            }
        }
        echo json_encode($res);
    }


    public function getUserInfoById()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['errors'] = [];

        if (!isset($_POST['apikey'])) {
            $res['error'] = true;
            $res['errors']['apikey'] = true;
        } else {
            $res['login_user'] = $this->user_model->GetUserInfoByApiKey($_POST['apikey']);
            if (!isset($res['login_user'])) {
                $res['error'] = true;
                $res['errors']['apikey'] = true;
            } else {
                unset($res['login_user']['password']);
                unset($res['login_user']['apikey']);
                if ((int)$_POST['user_id'] == 0) {
                    /*если ноль отдаем залогиненного*/
                    $res['user'] = $res['login_user'];
                } else {
                    $res['user'] = $this->user_model->getUserInfoById((int)$_POST['user_id']);
                    if (!isset($res['user'])) {
                        $res['error'] = true;
                        $res['errors']['user'] = true;
                    } else {
                        /*все верно юзер найден, прощитываем очки*/
                        /***********************************/
                        /***********************************/
                        /***********************************/

                    }
                }
            }
        }
        echo json_encode($res);
    }


    public function login()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;


        $res['user'] = $this->user_model->getUserInfoByLoginPass($_POST['login'], $_POST['password']);
        if (!isset($res['user'])) {
            $res['error'] = true;
        } else {
            if ($res['user']['group'] == 0) {
                $res['error'] = true;
                $res['user'] = null;
            }

        }

        echo json_encode($res);
    }


    public function getUserScoreInfoById()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['errors'] = [];

        if (!isset($_POST['apikey'])) {
            $res['error'] = true;
            $res['errors']['apikey'] = true;
        } else {
            $res['login_user'] = $this->user_model->GetUserInfoByApiKey($_POST['apikey']);
            if (!isset($res['login_user'])) {
                $res['error'] = true;
                $res['errors']['apikey'] = true;
            } else {
                unset($res['login_user']['password']);
                unset($res['login_user']['apikey']);
                if ((int)$_POST['user_id'] == 0) {
                    /*если ноль отдаем залогиненного*/
                    $res['user'] = $res['login_user'];
                } else {
                    $res['user'] = $this->user_model->getUserInfoById((int)$_POST['user_id']);
                    if (!isset($res['user'])) {
                        $res['error'] = true;
                        $res['errors']['user'] = true;
                    } else {
                        /*все верно юзер найден, прощитываем очки*/
                        /***********************************/
                        $res['score'] = $this->user_model->getUserScore((int)$_POST['user_id']);

                    }
                }
            }
        }
        echo json_encode($res);
    }


    public function updateAvatar()
    {
        //$_POST = json_decode(file_get_contents('php://input'), TRUE);
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

                $res['files'] = $_FILES;

                $this->user_model->updateAvatar($res['user']['id']);
            }
        }
        echo json_encode($res);
    }


    public function testSend()
    {
        $to = 'elextraza@gmail.com';
        $Subject = 'asdasdasd';
        $Body = 'jahdkajdh<br>kdjkajsdkj';
        $this->sendemail->send($to, $Subject, $Body);

    }

}
