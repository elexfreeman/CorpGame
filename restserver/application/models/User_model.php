<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class User_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);

    }

    public function GetUserInfoByEmail($email)
    {
        $sql = "select *  From users u where u.email= ? ";
        $query = $this->db->query($sql, [$email]);
        return $query->row_array();
    }


    public function GetUserInfoByApiKey($apiKey)
    {
        $sql = "select *, user_score(u.id) score From users u where u.apikey= ? ";
        $query = $this->db->query($sql, [$apiKey]);
        return $query->row_array();
    }

    public function getUserInfoById($user_id)
    {
        $sql = "select * , user_score(u.id) score From users u where u.id= ? ";
        $query = $this->db->query($sql, [$user_id]);
        return $query->row_array();
    }

    public function updateUserInfo($user_id, $data)
    {
        $this->db->reset_query();
        $this->db->where('id', $user_id);
        $this->db->update('users', $data);
    }

    public function getAllUsers()
    {
        $sql = "select * from users";
        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function generateApiKey()
    {
        return $this->functions->PassGen(20);
    }

    // обновление пароля у юзера
    public function UpdateUser($user_id, $data)
    {

        $this->db->reset_query();
        $this->db->where('id', $user_id);
        $this->db->update('users', $data);
    }



// обновление пароля у юзера
    public function updateAvatar($user_id)
    {

        if ((isset($_FILES)) and (isset($_FILES['avatar']))) {

            /*генерим случайную строку*/
            $rnd = $this->functions->PassGen();
            /*составляем имя файла из рнд строки и расширения*/
            /*todo распределять по каталогам*/

            $info = new SplFileInfo($_FILES['avatar']['name']);

            $img = $rnd . '.' . $info->getExtension();
            $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/img/uploads/" . $img;

            if (move_uploaded_file($_FILES['avatar']['tmp_name'], $uploadfile)) {
                $this->UpdateUser($user_id, ['photoUrl' => "/img/uploads/" . $img]);
            }
        }

    }


    public function regen_apikeys()
    {
        $users = $this->getAllUsers();
        foreach ($users as $user) {
            $this->UpdateUser($user['id'], ['apikey' => $this->generateApiKey()]);
        }
    }

    public function getUserInfoByLoginPass($login, $pass)
    {
        $sql = "select * From users u
        where (u.login=?)and(u.`password`=?)";

        $query = $this->db->query($sql, [$login, $pass]);
        return $query->row_array();
    }

    public function getUserScore($user_id)
    {
        $sql = "select 
            
            u.name
            ,(user_do_likes(u.id)+u.start_do_likes) user_likes
            ,user_score(u.id) score
            ,g.price
            ,g.goal
            from users u
            
            join (select price, goal  from goals order by goal desc limit 1) g
            
            where u.id = ?";

        $query = $this->db->query($sql, [$user_id]);
        return $query->row_array();
    }


}
