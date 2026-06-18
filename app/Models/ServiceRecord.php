<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceRecord extends Model
{
    protected $fillable = [
        'employee_id',
        'service_position',
        'service_department',
        'service_from',
        'service_to',
        'service_location',
    ];
}
