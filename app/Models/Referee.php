<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Referee extends Model
{
    protected $fillable = [
        'employee_id',
        'referee_name',
'referee_position',
'referee_department',
'rector_name',
'rector_position',
'rector_department',
'dept_head_name',
'dept_head_position',
'dept_head_department',
    ];
}
