<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class News_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);

    }


    public function sendNews($data)
    {
        $this->db->insert('news', $data);
        $id = $this->db->insert_id();


        if ((isset($_FILES)) and (count($_FILES) > 0)) {
            foreach ($_FILES as $key => $file) {

                /*генерим случайную строку*/
                $rnd = $this->functions->PassGen();
                /*составляем имя файла из рнд строки и расширения*/
                /*todo распределять по каталогам*/

                $info = new SplFileInfo($file['name']);

                $img = $rnd . '.' . $info->getExtension();
                $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/img/news_images/" . $img;

                if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
                    $this->db->reset_query();
                    $this->db->insert('news_images', array(
                        'news_id' => $id
                    , 'img' => "/img/news_images/" . $img
                    ));
                }

            }
        }

        return $id;
    }


    public function updateNews($news_id, $data)
    {

        $this->db->reset_query();
        $this->db->where('id', $news_id);
        $this->db->update('news', [
            'title' => $data['title']
            , 'news' => $data['news']
        ]);

        /*удаляемвсе картинки*/
        $sql = 'delete from news_images where news_id= '.$news_id;
        $this->db->query($sql);

        /*вставляем каринки*/
        if(isset($_POST['images'])){
            foreach ($_POST['images'] as $img){
                $this->db->reset_query();
                $this->db->insert('news_images', array(
                    'news_id' => $news_id
                , 'img' => $img
                ));
            }
        }



        if ((isset($_FILES)) and (count($_FILES) > 0)) {
            foreach ($_FILES as $key => $file) {

                /*генерим случайную строку*/
                $rnd = $this->functions->PassGen();
                /*составляем имя файла из рнд строки и расширения*/
                /*todo распределять по каталогам*/

                $info = new SplFileInfo($file['name']);

                $img = $rnd . '.' . $info->getExtension();
                $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/img/news_images/" . $img;

                if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
                    $this->db->reset_query();
                    $this->db->insert('news_images', array(
                        'news_id' => $news_id
                    , 'img' => "/img/news_images/" . $img
                    ));
                }

            }
        }

        return $news_id;
    }

    public function getListAdm($offset, $limit, $search_string)
    {
        $sql = "select             
            n.*
            ,(select ni.img from news_images ni where ni.news_id=n.id order by ni.id limit 1) news_img
            from news n
            where (n.deleted=0)
            order by n.id desc limit ?, ?";

        $query = $this->db->query($sql, [$offset, $limit]);
        return $query->result_array();
    }


    public function getList($offset, $limit)
    {
        $sql = "select             
            n.*
            ,(select ni.img from news_images ni where ni.news_id=n.id order by ni.id limit 1) news_img
            from news n
            where (n.published=1)and(n.deleted=0)
            order by n.id desc limit ?, ?";

        $query = $this->db->query($sql, [$offset, $limit]);
        return $query->result_array();
    }

    public function getNewsSingle($news_id)
    {
        $sql = "select * from news n where n.id=?";
        $this->db->reset_query();
        $query = $this->db->query($sql, [$news_id]);
        $news = $query->row_array();
        if(isset($news)){
            $sql = "select * from news_images ni where ni.news_id=? ";
            $this->db->reset_query();
            $query = $this->db->query($sql, [$news_id]);

            $news['images'] = $query->result_array();
        }

        return $news;

    }


    public function getNewsItemImages($news_id)
    {
        $sql = "select * from news_images ni where ni.news_id=? ";

        $query = $this->db->query($sql, [$news_id]);
        return $query->result_array();
    }


    public function deleteNews($news_id)
    {
        $this->db->reset_query();
        $this->db->where('id', $news_id);
        $this->db->update('news', [
            'deleted' => 1
        ]);
        return $news_id;
    }

}
