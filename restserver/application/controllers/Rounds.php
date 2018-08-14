<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rounds extends CI_Controller
{


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('rounds_model');
    }

    public function index()
    {
        echo 'cool';
    }


    public function getRoundsList()
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

                $res['rounds'] = $this->rounds_model->getRoundsList();
            }
        }
        echo json_encode($res);
    }


    public function getCurentRound()
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

                $res['round'] = $this->rounds_model->getCurentRound();
            }
        }
        echo json_encode($res);
    }

    public function updateRound()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
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
                    $this->rounds_model->updateRound(1, array(
                        'description' => $_POST['description']
                    ));
                } else {
                    $res['error'] = true;
                }
            }
        }
        echo json_encode($res);
    }

    public function getGoalsList()
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

                $res['goals'] = $this->rounds_model->getGoalsList(1);
            }
        }
        echo json_encode($res);
    }

    public function getFinishGoal()
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

                $res['goal'] = $this->rounds_model->getFinishGoal(1);
            }
        }
        echo json_encode($res);
    }


    public function deleteGoal()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
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
                    $this->rounds_model->updateGoal((int)$_POST['id'], array(
                        'deleted' => 1
                    ));
                } else {
                    $res['error'] = true;
                }
            }
        }
        echo json_encode($res);
    }


    public function updateGoal()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
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
                    $this->rounds_model->updateGoal((int)$_POST['id'], array(
                        'caption' => $_POST['caption']
                    , 'description' => $_POST['description']
                    , 'price' => $_POST['price']
                    , 'goal' => $_POST['goal']
                    , 'user_level_caption' => $_POST['user_level_caption']
                    ));
                } else {
                    $res['error'] = true;
                }
            }
        }
        echo json_encode($res);
    }

    public function addGoal()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
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
                    $this->rounds_model->addGoal(array(
                        'caption' => $_POST['caption']
                    , 'description' => $_POST['description']
                    , 'price' => $_POST['price']
                    , 'goal' => $_POST['goal']
                    , 'user_level_caption' => $_POST['user_level_caption']
                    , 'round_id' => 1
                    ));
                } else {
                    $res['error'] = true;
                }
            }
        }
        echo json_encode($res);
    }


}
