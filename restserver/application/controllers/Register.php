<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller
{

    public $solt = 'serega molodec';


    public function __construct()
    {
        parent::__construct();
        $this->load->model('auth_model');
        $this->load->model('user_model');
    }

    public function index()
    {
        echo 'cool';
    }

    public function register()
    {
        $_POST = json_decode(file_get_contents('php://input'), TRUE);
        $res = [];
        $res['post'] = $_POST;

        /*ошибки регистрации*/
        $res['error'] = false;
        $res['errors'] = [];
        $res['errors']['email'] = false;
        $res['errors']['pass'] = false;
        $res['errors']['pass2'] = false;
        $res['errors']['pass_len'] = false;
        $res['errors']['user_exist'] = false;

        if(!isset($_POST['email'])){
            $res['errors']['email'] = true;
            $res['error'] = true;
        } else {
            if(mb_strlen($_POST['email'])<4){
                $res['errors']['email'] = true;
                $res['error'] = true;
            } else {
                $t_user = $this->user_model->GetUserInfoByEmail($_POST['email']);
                if(isset($t_user)){
                    $res['errors']['user_exist'] = true;
                    $res['error'] = true;
                }
            }

        }

        if(!isset($_POST['pass'])){
            $res['errors']['pass'] = true;
            $res['error'] = true;
        } else {
            /*длина меньше 6 символов*/
            if(mb_strlen($_POST['pass'])<6){
                $res['errors']['pass_len'] = true;
                $res['errors']['pass'] = true;
                $res['error'] = true;
            }
            /*пароли не совпадают*/
            if($_POST['pass']!=$_POST['pass2']){
                $res['errors']['pass2'] = true;
                $res['error'] = true;
            }
        }




        if(!$res['error']){
            /*регистрируем*/
            $user = [];
            $user['password'] = md5($_POST['pass'].$this->solt);
            $user['apikey'] = $this->auth_model->generateApiKey();
            $user['email'] = $_POST['email'];

            $this->auth_model->CreateUser($user);
            $res['apikey'] = $user['apikey'];

        } else {
            $res['error'] = true;
        }


        echo json_encode($res);
    }


}
