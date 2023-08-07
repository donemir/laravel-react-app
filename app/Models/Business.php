<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Business extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'email',
        'phone',
        'slug',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
