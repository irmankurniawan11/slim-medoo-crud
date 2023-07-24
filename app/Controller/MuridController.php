<?php

namespace App\Controller;

class MuridController extends BaseController {
    public static function getMuridById($app, $request, $response, $args) {
        $sid = $args['id'];
        $data = $app->db->select('tbl_member', ['[><]tbl_sekolah' => ["id_sekolah" => "id"]], ['tbl_member.id', 'nama', 'nama_sekolah', 'email'], ['tbl_member.id' => $sid]);
        return $response->withJson($data);
    }

    public static function getAllMurid($app, $request, $response, $args) {
        $data = $app->db->select('tbl_member', ['id', 'nama', 'email'], ["id[<]" => 50]);
        return $response->withJson($data);
    }
}