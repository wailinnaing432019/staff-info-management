<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourtDisciplinaryAction extends Model
{
    protected $fillable = [
        'employee_id',
        'period',
'reason',
'penalty',
'remark',
'record_type'
    ];
}
