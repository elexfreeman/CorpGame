<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class News extends CI_Controller
{

/*todo сделать запрет на редактирования не админам*/
    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('news_model');
    }

    public function index()
    {
        echo 'cool';
    }


    public function sendNews()
    {
        //$_POST = json_decode(file_get_contents('php://input'), TRUE);
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

                if (!isset($_POST['news'])) {
                    $_POST['errors']['news'] = 0;
                }

                if (!isset($_POST['title'])) {
                    $_POST['errors']['title'] = 0;
                }


                if (!$res['error']) {
                    $data = array(
                        'news' => $_POST['news']
                        ,'title' => $_POST['title']
                    , 'user_id' => $res['user']['id']
                    );
                    $res['news_id'] = $this->news_model->sendNews($data);
                }

            }
        }
        echo json_encode($res);
    }



    public function updateNews()
    {
        //$_POST = json_decode(file_get_contents('php://input'), TRUE);
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

                if (!isset($_POST['news'])) {
                    $_POST['errors']['news'] = 0;
                }

                if (!isset($_POST['news_id'])) {
                    $_POST['errors']['news_id'] = 0;
                }

                if (!isset($_POST['title'])) {
                    $_POST['errors']['title'] = 0;
                }


                if (!$res['error']) {
                    $data = array(
                        'news' => $_POST['news']
                    ,'title' => $_POST['title']
                    , 'user_id' => $res['user']['id']
                    );
                    $res['news_id'] = $this->news_model->updateNews((int)$_POST['news_id'], $data);
                }

            }
        }
        echo json_encode($res);
    }


    public function deleteNews()
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

                if (!isset($_POST['news_id'])) {
                    $_POST['errors']['news_id'] = 0;
                }

                if (!$res['error']) {
                    $res['news_id'] = $this->news_model->deleteNews((int)$_POST['news_id']);
                }

            }
        }
        echo json_encode($res);
    }

    public function getListAdm()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
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

                $search_string = '';
                if (isset($_POST['search_string'])) {
                    $search_string = $_POST['search_string'];
                }

                $offset = 0;
                if (isset($_POST['offset'])) {
                    $offset = (int)$_POST['offset'];
                }

                $limit = 10;
                if (isset($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }


                if (!$res['error']) {
                    $res['news'] = $this->news_model->getListAdm($offset, $limit,  $search_string);
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

                $search_string = '';
                if (isset($_POST['search_string'])) {
                    $search_string = $_POST['search_string'];
                }

                $offset = 0;
                if (isset($_POST['offset'])) {
                    $offset = (int)$_POST['offset'];
                }

                $limit = 10;
                if (isset($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }


                if (!$res['error']) {
                    $res['news'] = $this->news_model->getList($offset, $limit,  $search_string);
                }

            }
        }
        echo json_encode($res);
    }



    public function getNewsSingle()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
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


                if(!isset($_POST['news_id'])){
                    $res['error'] = true;
                }

                if (!$res['error']) {
                    $res['news'] = $this->news_model->getNewsSingle((int)$_POST['news_id']);
                }

            }
        }
        echo json_encode($res);
    }


    public function getNewsItemImages()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;
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


                if(!isset($_POST['news_id'])){
                    $res['error'] = true;
                }


                if (!$res['error']) {
                    $res['news_images'] = $this->news_model->getNewsItemImages((int)$_POST['news_id']);
                }

            }
        }
        echo json_encode($res);
    }


}
