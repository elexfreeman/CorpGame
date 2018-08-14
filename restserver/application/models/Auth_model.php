<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Auth_model extends CI_Model
{

    public $auth;

    public $settings;
    public $UsersTable;

    public function __construct()
    {
        $this->load->library('functions');

        $this->db = $this->load->database('default', TRUE);

    }


//генератор паролей
    public function PassGen($max=10)
    {
        // Символы, которые будут использоваться в пароле.
        $chars="qazxswedcvfrtgbnhyujmkip23456789QAZXSWEDCVFRTGBNHYUJMKLP";
        // Количество символов в пароле.

        // Определяем количество символов в $chars
        $size=StrLen($chars)-1;

        // Определяем пустую переменную, в которую и будем записывать символы.
        $password=null;

        // Создаём пароль.
        while($max--)
            $password.=$chars[rand(0,$size)];

        // Выводим созданный пароль.
        return $password;
    }


    public function CreateUser($arg)
    {
        $this->db->query($this->db->insert_string('users', $arg));
        $user_id = $this->db->insert_id();
        return $user_id;
    }



    /*Проверка на существование юзера*/
    public function  GetUserByID($user_id)
    {
        $user_id=(int)$user_id;
        $sql="select * from users where
        id=".$user_id;

        $query = $this->db->query($sql);
        return $query->row_array();

    }




    public function generateApiKey(){
        return $this->functions->PassGen(20);
    }


}
