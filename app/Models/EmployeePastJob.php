<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeePastJob extends Model
{
    protected $fillable = [
        'employee_id', 'prev_position', 'prev_dept', 'prev_location','prev_rank','type'
    ];
}
