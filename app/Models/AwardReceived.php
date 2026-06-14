<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AwardReceived extends Model
{
    protected $fillable = [
        'employee_id',
        'award_title',
'award_year',
'award_period',
'award_remark',
    ];
}
