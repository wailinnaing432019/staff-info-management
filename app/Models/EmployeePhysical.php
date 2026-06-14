<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeePhysical extends Model
{
    protected $fillable = [
        'employee_id',
        'height',
'weight',
'hair_color',
'eye_color',
'blood_type',
'distinctive_mark',
    ];
}
