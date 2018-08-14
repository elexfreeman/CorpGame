<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Wall extends CI_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('wall_model');

        $this->load->library('sendemail');
    }

    public function index()
    {
        echo 'cool';
    }


    public function getUserWall()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['wall'] = [];
        $offset = 0;
        if (isset($_POST['offset'])) {
            $offset = (int)$_POST['offset'];
        }

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
                if (isset($_POST['user_id'])) {
                    $res['profile'] = $this->user_model->getUserInfoById((int)$_POST['user_id']);
                    if (isset($res['profile'])) {
                        /*отступ на запись*/
                        $res['wall'] = $this->wall_model->getUserWall((int)$_POST['user_id'], $offset);
                    }
                } else {
                    /*если нету user_id берем залогиненного*/
                    $res['wall'] = $this->wall_model->getUserWall($res['user']['id'], $offset);
                }
            }
        }
        echo json_encode($res);
    }


    public function getUserOnlyWall()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;

        $res['error'] = false;
        $offset = 0;
        if (isset($_POST['offset'])) {
            $offset = (int)$_POST['offset'];
        }

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
                if (isset($_POST['user_id'])) {
                    $res['profile'] = $this->user_model->getUserInfoById((int)$_POST['user_id']);
                    if (isset($res['profile'])) {
                        /*отступ на запись*/
                        $res['wall'] = $this->wall_model->getUserOnlyWall((int)$_POST['user_id'], $offset);
                    }
                } else {
                    /*если нету user_id берем залогиненного*/
                    $res['wall'] = $this->wall_model->getUserWall($res['user']['id'], $offset);
                }
            }
        }
        echo json_encode($res);
    }


    public function getWallItemComments()
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
                unset($res['user']['hash']);

                $res['error'] = false;
                $res['wall_comments'] = $this->wall_model->getWallItemComments((int)$_POST['wall_item_id']);

            }
        }
        echo json_encode($res);
    }


    public function getWall2ItemComments()
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
                unset($res['user']['hash']);

                $res['error'] = false;
                $res['wall_comments'] = $this->wall_model->getWall2ItemComments((int)$_POST['wall_item_id']);

            }
        }
        echo json_encode($res);
    }


    public function sendLike()
    {
        // $_POST = json_decode(file_get_contents('php://input'), TRUE);
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

                if (!isset($_POST['parent'])) {
                    $_POST['parent'] = 0;
                }

                if (!isset($_POST['rule'])) {
                    $_POST['rule'] = 1;
                }

                if (!isset($_POST['user_whom'])) {
                    $res['errors']['user_whom'] = true;
                    $res['error'] = true;
                }

                if (!$res['error']) {
                    $data = array(
                        'content' => $_POST['content']
                    , 'rule' => $_POST['rule']
                    , 'parent' => $_POST['parent']
                    , 'author' => $res['user']['id']
                    , 'user_whom' => $_POST['user_whom']

                    );
                    $res['like_id'] = $this->wall_model->sendLike($data);

                    $res['item'] = $this->wall_model->getUserWallItem($res['like_id']);


                    /*todo отправить сообщение на почту user_whom*/
                    /*проверить если это не сам себе написал*/
                    if ((int)$_POST['user_whom'] != $res['user']['id']) {
                        $user_whom = $this->user_model->getUserInfoById((int)$_POST['user_whom']);
                        if ($user_whom['email'] != '') {
                            /*отправляем писмо*/
                            $res['email'] = 'отправленно уведомление на ' . $user_whom['email'];

                            $to = $user_whom['email'];
                            $Subject = 'BergGame| Тебя похвалил (а) ' . $res['user']['name'];
                            $Body = 'Поздравляем!<br>
                                Ты стал(а) еще ближе к Цели!<br><br>
                                
                                Жми сюда, чтобы посмотреть -> <a href="https://bergame.kruiz.online/">https://bergame.kruiz.online/</a><br><br>
                                
                                И помни про наши ценности:<br>
                                ДРУЖИТЬ ДЕЛИТЬСЯ ДОВЕРЯТЬ БЫТЬ ОТКРЫТЫМ БЫТЬ КЛИЕНТООРИЕНТИРОВАННЫМ';
                            $this->sendemail->send($to, $Subject, $Body);
                        }
                    }
                }
            }
        }
        echo json_encode($res);
    }


    public function getActivityWall()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['wall'] = [];
        $offset = 0;
        if (isset($_POST['offset'])) {
            $offset = (int)$_POST['offset'];
        }

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
                $res['wall'] = $this->wall_model->getActivityWall($res['user'], $offset);

            }
        }
        echo json_encode($res);
    }

    public function deleteLike()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
        $res['error'] = false;
        $res['wall'] = [];
        $offset = 0;
        if (isset($_POST['offset'])) {
            $offset = (int)$_POST['offset'];
        }

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

                /*если одмин*/
                if($res['user']['group']==2){

                    $res['wall'] = $this->wall_model->deleteLike($_POST['like_id']);
                }


            }
        }
        echo json_encode($res);
    }


}
