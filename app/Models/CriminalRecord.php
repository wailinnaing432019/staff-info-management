<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CriminalRecord extends Model
{
    protected $fillable = [
        'employee_id',
        'criminalPenalty',
        'reasonPelanty',
        'criminalFrom',
        'criminalTo',
    ];
}
