<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $fillable = [
        'employee_id',
        'learn_course',
'learn_from',
'learn_to',
'location',
'rank',
'category'
    ];
}
