<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Sendemail {

    public $CI;


    public function __construct()
    {

    #    $this->CI =& get_instance();
    #    $this->CI->dbMySQL = $this->CI->load->database('dbMySQL', TRUE);
    #    $this->table_prefix="modx_";
    }


    public function send($to,$Subject,$Body)
    {
        $headers =  "From: bergame@kruiz.online"."\r\n" ;
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        //mail($to, $Subject, $Body, $headers);

    }



}