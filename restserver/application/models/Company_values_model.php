<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Company_values_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);

    }

    public function getList()
    {
        $sql = "select * from company_values c where (c.deleted=0) order by id desc";
        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function update($id, $arg)
    {
        $this->db->reset_query();
        $this->db->where('id', $id);
        $this->db->update('company_values', $arg);

        if ((isset($_FILES)) and (count($_FILES) > 0)) {
            foreach ($_FILES as $key => $file) {

                /*генерим случайную строку*/
                $rnd = $this->functions->PassGen();
                /*составляем имя файла из рнд строки и расширения*/
                /*todo распределять по каталогам*/

                $info = new SplFileInfo($file['name']);

                $img = $rnd . '.' . $info->getExtension();
                $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/img/company_values/" . $img;

                if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
                    $this->db->reset_query();
                    $this->db->where('id', $id);
                    if ($key == 'img_file_w') {
                        $this->db->update('company_values', array('img_w' => "/img/company_values/" . $img));
                    }
                    if ($key == 'img_file_b') {
                        $this->db->update('company_values', array('img_b' => "/img/company_values/" . $img));
                    }

                }
            }
        }
    }

    public function add($data)
    {
        $this->db->insert('company_values', $data);
        $id = $this->db->insert_id();

        if ((isset($_FILES)) and (count($_FILES) > 0)) {
            foreach ($_FILES as $key => $file) {

                /*генерим случайную строку*/
                $rnd = $this->functions->PassGen();
                /*составляем имя файла из рнд строки и расширения*/
                /*todo распределять по каталогам*/

                $info = new SplFileInfo($file['name']);

                $img = $rnd . '.' . $info->getExtension();
                $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/img/company_values/" . $img;

                if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
                    $this->db->reset_query();
                    $this->db->where('id', $id);
                    if ($key == 'img_file_w') {
                        $this->db->update('company_values', array('img_w' => "/img/company_values/" . $img));
                    }
                    if ($key == 'img_file_b') {
                        $this->db->update('company_values', array('img_b' => "/img/company_values/" . $img));
                    }
                }
            }
        }
        return $id;
    }


}
