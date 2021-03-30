<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use http\Env\Response;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return \response()-> json(['status' => 200, 'contacts' => $contacts]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $contact = new Contact();
        $contact-> fullName = $request-> get('fullName');
        $contact-> email = $request-> get('email');
        $contact-> phone = $request-> get('phone');

        $isSaved = $contact-> save();
        if($isSaved){
            return response()-> json(['status' => 200]);
        }else{
            return Response()-> json(['status' => 500]);
        }
    }

    public function show($id)
    {
        $contact = Contact::find($id);
        if($contact){
            return response()-> json(['status'=>200, 'contact'=>$contact]);
        }else{
            return response()-> json(['status'=>404]);
        }
    }

    public function edit($id)
    {
        $contact = Contact::find($id);
        if($contact){
            return response()-> json(['status'=>200, 'contact'=>$contact]);
        }else{
            return response()-> json(['status'=>404]);
        }
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        if($contact){
            $contact-> fullName = $request-> get('fullName');
            $contact-> email = $request-> get('email');
            $contact-> phone = $request-> get('phone');
            $isSaved = $contact-> save();
            if($isSaved){
                return response()-> json(['status'=>200]);
            }else{
                return response()-> json(['status'=>500]);
            }
        }else{
            return response()-> json(['status'=>500]);
        }

    }

    public function destroy($id)
    {
        $contact = Contact::find($id);
        if($contact){
            $contact-> delete();
            return response()-> json(['status'=>200]);
        }else{
            return response()-> json(['status' => 404]);
        }
    }
}
