<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForeignVisitedPurpose extends Model
{
    protected $fillable = [
        'employee_id',
        'destination_country',
        'assigned_country',
        'time_period',
        'arrival_date',
        'training_course',
        'supporting_agency',
        'return_department',
        'foreign_visit_details',
    ];
}
