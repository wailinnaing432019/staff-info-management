<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbroadVisit extends Model
{
    protected $fillable = [
        'employee_id',
        'country_visited',
'visit_purpose',
'abroad_from',
'abroad_to',
'foreign_currency_amount',
    ];
}
