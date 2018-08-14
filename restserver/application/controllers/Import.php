<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Import extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('import_model');
    }

    public function index()
    {
        $this->import_model->import();
    }

}
