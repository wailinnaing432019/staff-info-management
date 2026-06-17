<?php

namespace App\Repositories\Contracts;

use Illuminate\Http\Request;

interface EmployeeRepositoryInterface
{
    public function paginateWithFilters(Request $request);
    public function findWithRelations(int $id);
    public function checkStaffNumber(string $staffNumber);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}