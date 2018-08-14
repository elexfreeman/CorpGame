<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Users_model extends CI_Model
{
    public function __construct()
    {
        $this->load->library('functions');
        $this->db = $this->load->database('default', TRUE);

    }

    public function getMembersListTotalScore($limit)
    {
        $sql = "
            select 
             u.id, u.name, photoUrl, `group`, `level`, email, game_over, surname, 
             about, phone, city, education, instagram, vk, hobby, 
             book, question, sex 
             
             ,user_score(u.id) score
            
             from users u
             
             where (u.group>0)
            
            order by score desc limit ?";
        $query = $this->db->query($sql, [$limit]);
        return $query->result_array();
    }

    public function getMembersMembersLikes($limit)
    {
        $sql = "
select * from (
select 
                 u.id
                            ,u.name
                            ,u.photoUrl
                            ,u.`group`
                            ,u.email
                            ,u.surname
                            , (g.score+u.start_do_likes) score
                            
                 from users u
                
                left join (
                
                
                select sum(coef) score, author from (
                
                
                select * from
                (select 
                    l.* ,lr.coef
                from likes l
                join likes l_root
                on 
                ((l_root.id=l.parent)and(l_root.author<>l.author))
                
                  JOIN like_rules lr ON lr.id=l.rule
                  
                where 
                (l.parent>0)
                
                group by l.author) a
                
                union
                
                select * from 
                (
                  SELECT l.*, lr.coef
                      FROM likes l
                      JOIN like_rules lr ON lr.id=l.rule
                      where 
                        (l.parent=0)
                        and(l.author<>l.user_whom)
                    
                )b
                
                ) d
                group by author ) g
                
                on g.author=u.id
                
                where u.group>0 )bb
                
                order by score desc limit ?

";
        $query = $this->db->query($sql, [$limit]);
        return $query->result_array();
    }

}
