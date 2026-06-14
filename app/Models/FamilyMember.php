<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    protected $fillable = [
        'employee_id',
        'relation_name',
'gender',
'nationality',
'occupation',
'address',
'remark',
'relationship_type',
'family_lineage',
    ];
}
