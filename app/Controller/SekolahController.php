<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Slim\Http\Response as HttpResponse;

class SekolahController extends BaseController {

    public static function index($app, $request, $response, $args=null) {
        $data = $app->db->select('tbl_sekolah', ['id', 'nama_sekolah', 'alamat']);

        $app->view->render($response, 'sekolah.twig', 
            [
                "title" => "Data Sekolah",
                "data" => $data,
            ]
        );
    }
    public static function create($app, $request, $response, $args) {
        $data = $request->getParsedBody();
        $lastId = $app->db->count('tbl_sekolah', 'id');
        $result = $app->db->insert('tbl_sekolah', [
            'id' => $lastId+2,
            'nama_sekolah' => $data['nama_sekolah'],
            'alamat' => $data['alamat']
        ]);

        return $response->withJson($result);
    }

    public static function getSekolahById($app, $request, $response, $args) {
        $sid = $args['id'];
        $data = $app->db->select('tbl_sekolah', ['id', 'nama_sekolah', 'alamat'], ['id' => $sid]);
        return $response->withJson($data);
    }

    public static function getAllSekolah($app, $request, $response, $args) {
        $data = $app->db->select('tbl_sekolah', ['id', 'nama_sekolah', 'alamat']);
        $jml_data = count($data);

        $limit = $request->getParam('length');
        $start = $request->getParam('start');
        $conditions = [
            "LIMIT" => [$start, $limit]
        ];

        if (!empty($request->getParam('search')['value'])) {
            $search = $request->getParam('search')['value'];
            $conditions['tbl_sekolah.nama_sekolah[~]'] = '%' . $search . '%';
        }

        $schools = $app->db->select('tbl_sekolah', ['id', 'nama_sekolah', 'alamat'], $conditions);

        $totalfiltered = count($data);

        $data = array();

        if(!empty($schools)) {
            $number = $request->getParam('start') + 1;
            foreach ($schools as $school) {
                $dt['no'] = $number;
                $dt['nama_sekolah'] = $school['nama_sekolah'];
                $dt['alamat'] = $school['alamat'];
                $dt['action'] = '<button type="button" class="btn btn-info item_detail" data="' . $school['id'] . '"><i class="bi bi-info-circle-fill"></i></button> <button type="button" class="btn btn-warning item_edit" data="' . $school['id'] . '"><i class="bi bi-pencil-square"></i></button> <button type="button" class="btn btn-danger item_hapus" data="' . $school['id'] . '"><i class="bi bi-trash-fill"></i></button>';

                $data[] = $dt;
                $number++;
            }
        }

        $json_data = array(
            "recordsTotal" => intval($jml_data),
            "recordsFiltered" => intval($totalfiltered),
            "data" => $data
        );
        
        return $response->withJson($json_data);
    }

    public static function deleteSekolah($app, $request, HttpResponse $response, $args) {
        $id = $args['data']['id'];
        $result = $app->db->delete('tbl_sekolah', ["id" => intval($id)]);
        return $response->withJson($result);
    }
}