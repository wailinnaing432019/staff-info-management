<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeInfo extends Model
{
    protected $fillable = [
        'employee_id',
        'degree',
'childrens',
'current_address',
'permanent_address',
'assignment_type',
'current_training',
'is_accompanied',
'not_border',
'separation_date',
'email',
'image_path',
'mobile_phno',
'remark',
    ];
}
