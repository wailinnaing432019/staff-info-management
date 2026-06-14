<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeEmployment extends Model
{
    protected $fillable = [
        'employee_id',
        'position',
'department',
'salary_scale',
'salary_rate',
'employee_start_date_detail',
'current_pos_start_date_detail',
'current_dept_start_date_detail',
'year_of_service',
'penalty_detail',
'contract_agreement_detail',
'foreign_detail',
'training_detail',
'transfer_detail',
    ];
}
