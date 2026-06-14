<?php

namespace App\Http\Controllers\staff;

use App\Http\Controllers\Controller;
use App\Models\c;
use App\Models\Employee;
use App\Services\EmployeeService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StaffController extends Controller
{
    protected $employeeService;

    // Service Class ကို Dependency Injection ဖြင့် လှမ်းချိတ်ခြင်း
    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

$employees = Employee::query()
    // 📸 'info' relationship ထဲက id, employee_id နှင့် image_path ကိုပဲ ဆွဲထုတ်ခြင်း
    // 💡 သတိပြုရန် - Eloquent Relationship အလုပ်လုပ်ရန် 'employee_id' ကို select ထဲတွင် မဖြစ်မနေ ထည့်ပေးရပါမည်။
    ->with(['info' => function ($query) {
        $query->select('id', 'employee_id', 'image_path'); 
    }])
    ->when($search, function ($query, $search) {
        $query->where('name', 'like', "%{$search}%");
    })
    ->select([
        'id',
        'staff_number',
        'name',
        'gender',
        'date_of_birth',
        'race',
        'religion',
        'nrc_state',
        'nrc_township',
        'nrc_type',
        'nrc_number',
        'father_name',
        'marital_status'
    ])
    ->latest()
    ->paginate(2)
    ->withQueryString();

return Inertia::render('Staff/Index', [
    'employees' => $employees,
    'filters' => $request->only(['search'])
]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Staff/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->toArray());
        try {

            $request->validate([
                'image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            // ၂။ Request ထဲက Field တွေအကုန်လုံးကို Array အဖြစ် တိုက်ရိုက်ယူလိုက်ပါသည် (Manual ရေးစရာမလိုပါ)
            $data = $request->all();

            // ၃။ ပုံအစစ်အမှန် ပါလာခြင်း ရှိ/မရှိ စစ်ဆေးသည်
            if ($request->hasFile('image_path')) {
                // ပုံကို public/employees ထဲသိမ်းပြီး လမ်းကြောင်းကို $data ထဲ ထည့်ပါမည်
                $path = $request->file('image_path')->store('employees', 'public');
                $data['image_path'] = $path;
            } else {
                // 💡 အရေးကြီးချက် - ပုံအသစ် မပါလာရင် request ထဲက 'image_path' ကြောင့် DB ထဲမှားမဝင်အောင် ဖြုတ်ချထားရပါမည်
                // (ဒါမှ Edit လုပ်တဲ့အခါ ပုံဟောင်း မပျောက်မှာဖြစ်ပြီး၊ Create လုပ်ရင်လည်း null ပဲ ဝင်မှာပါ)
                unset($data['image_path']);
            }

            // Service Class ကို သုံးပြီး ဒေတာလှမ်းသိမ်းသည်
            $this->employeeService->createEmployee($data);

            return redirect()->route('employees.index')
                ->with('success', 'ဝန်ထမ်းအချက်အလက်အားလုံးကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ။');
        } catch (Exception $e) {
            dd($e->getMessage());
            // တစ်ခုခု မှားယွင်းသွားပါက Error Message ပြန်ပို့မည်
            return redirect()->back()
                ->withInput()
                ->with('error', 'ဒေတာသိမ်းဆည်းစဉ် ပြဿနာတစ်ခုဖြစ်ပွားခဲ့ပါသည်- ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Service အကူအညီဖြင့် ဒေတာဆွဲထုတ်ခြင်း
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);

        // React ဘက်သို့ ဒေတာ ပို့ပေးခြင်း
        return Inertia::render('Staff/Show', [
            'employeeData' => $employeeData
        ]);
    }

    public function format18Pdf($id)
    {
        // Service အကူအညီဖြင့် ဒေတာဆွဲထုတ်ခြင်း
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);

        // React ဘက်သို့ ဒေတာ ပို့ပေးခြင်း
        return Inertia::render('Staff/pdf/Format18Pdf', [
            'data' => $employeeData
        ]);
    }
    public function format36Pdf($id)
    {
        // Service အကူအညီဖြင့် ဒေတာဆွဲထုတ်ခြင်း
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);

        // React ဘက်သို့ ဒေတာ ပို့ပေးခြင်း
        return Inertia::render('Staff/pdf/Format36Pdf', [
            'data' => $employeeData
        ]);
    }
    public function format25Pdf($id)
    {
        // Service အကူအညီဖြင့် ဒေတာဆွဲထုတ်ခြင်း
        $employeeData = $this->employeeService->getEmployeeWithFormats($id);

        // React ဘက်သို့ ဒေတာ ပို့ပေးခြင်း
        return Inertia::render('Staff/pdf/Format25Portait', [
            'data' => $employeeData
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // 💡 Tab (၇) ခုလုံးအတွက် လိုအပ်သော Relational Data အားလုံးကို တစ်ခါတည်း ဆွဲထုတ်ခြင်း
        $employee = Employee::with([
            'physical',
            'info',
            'employment',
            'educations',
            'trainings',
            'serviceRecords',
            'familyMembers',
            'abroadVisits',
            'foreignVisitedPurpose',
            'awardsReceived',
            'courtDisciplinaryActions',
            'criminalRecords'
        ])->findOrFail($id);

        return Inertia::render('Staff/Edit', [
            'employee' => $employee
        ]);
    }



    public function update(Request $request, $id)
    {
        // ၁။ ပြင်ဆင်မည့် ဝန်ထမ်း Record ရှိ/မရှိ စစ်ဆေးခြင်း
        $employee = Employee::findOrFail($id);
        $validated = $request->all();

        $oldImagePath = $employee->info->image_path ?? null;
        $newImagePath = null;

        // 📸 ဓာတ်ပုံ ပြင်ဆင်ခြင်း/အစားထိုးခြင်း ဆိုင်ရာ Logic
        if ($request->hasFile('image_path')) {

            // Validation စစ်ဆေးခြင်း (Optional - စိတ်ကြိုက်ပြင်နိုင်ပါသည်)
            $request->validate([
                'image_path' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            ]);



            // (ခ) ပုံအသစ်ကို 'public/employees' အောက်ထဲသို့ အလိုအလျောက် အမည်ပေး သိမ်းဆည်းခြင်း
            $path = $request->file('image_path')->store('employees', 'public');

            // database ထဲ သိမ်းရန် array ထဲသို့ လမ်းကြောင်း (path) ထည့်ပေးခြင်း
            $validated['image_path'] = $path;
        }
        // ၃။ Database Transaction သုံးပြီး Data များကို အမှားအယွင်းမရှိ သိမ်းဆည်းခြင်း
        DB::beginTransaction();

        try {
            //  dd($validated);
            // (က) Main Employee Table ကို Mass Assignment ဖြင့် တစ်ခါတည်း Update လုပ်ခြင်း
            // 💡 သတိပြုရန် - Employee Model ထဲတွင် $fillable သတ်မှတ်ထားရပါမည်။
            $employee->update($validated);

            // (ခ) One-to-One Relational Tables များအား UpdateOrCreate လုပ်ခြင်း
            // Form Input Name နှင့် Database Column Name တူညီသဖြင့် တစ်ခါတည်း ပစ်ထည့်နိုင်ပါသည်
            $employee->physical()->updateOrCreate(['employee_id' => $employee->id], $validated);
            $employee->info()->updateOrCreate(['employee_id' => $employee->id], $validated);
            $employee->employment()->updateOrCreate(['employee_id' => $employee->id], $validated);
            $employee->foreignVisitedPurpose()->updateOrCreate(['employee_id' => $employee->id], $validated);

            // (ဂ) One-to-Many Dynamic Array Table များအား Sync လုပ်ခြင်း
            // ၁။ ပညာအရည်အချင်း

            if (isset($validated['educations'])) {
                $filteredEducations = array_filter($validated['educations'], fn($item) => !empty($item['degree_name']));

                // Form ထဲက ပါလာသည့် ID များကို စုစည်းခြင်း
                $keepIds = collect($filteredEducations)->pluck('id')->filter()->toArray();

                // Form ထဲမှာ ပါမလာတော့သည့် ဒေတာအဟောင်းများကိုသာ ရွေးဖျက်ခြင်း
                $employee->educations()->whereNotIn('id', $keepIds)->delete();

                // ရှိပြီးသားကို Update လုပ်ပြီး မရှိသေးပါက အသစ်ဆောက်ခြင်း
                foreach ($filteredEducations as $edu) {
                    $employee->educations()->updateOrCreate(
                        ['id' => $edu['id'] ?? null],
                        $edu
                    );
                }
            } else {
                // အကယ်၍ Form ထဲတွင် array တစ်ခုလုံး လုံးဝပါမလာပါက အကုန်ဖျက်ရန်
                $employee->educations()->delete();
            }

            // ၂။ သင်တန်းမှတ်တမ်း
            if (isset($validated['trainings'])) {
                $filteredTrainings = array_filter($validated['trainings'], fn($item) => !empty($item['learn_course']));
                $keepIds = collect($filteredTrainings)->pluck('id')->filter()->toArray();
                $employee->trainings()->whereNotIn('id', $keepIds)->delete();

                foreach ($filteredTrainings as $training) {
                    $employee->trainings()->updateOrCreate(
                        ['id' => $training['id'] ?? null],
                        $training
                    );
                }
            } else {
                $employee->trainings()->delete();
            }

            // ၃။ တာဝန်ထမ်းဆောင်မှုမှတ်တမ်း
            if (isset($validated['service_records'])) {
                $filteredRecords = array_filter($validated['service_records'], fn($item) => !empty($item['service_position']));
                $keepIds = collect($filteredRecords)->pluck('id')->filter()->toArray();
                $employee->serviceRecords()->whereNotIn('id', $keepIds)->delete();

                foreach ($filteredRecords as $record) {
                    $employee->serviceRecords()->updateOrCreate(
                        ['id' => $record['id'] ?? null],
                        $record
                    );
                }
            } else {
                $employee->serviceRecords()->delete();
            }

            // ၄။ မိသားစုဝင်များ
            if (isset($validated['families'])) {
                $filteredFamilies = array_filter($validated['families'], fn($item) => !empty($item['relation_name']));
                $keepIds = collect($filteredFamilies)->pluck('id')->filter()->toArray();
                $employee->familyMembers()->whereNotIn('id', $keepIds)->delete();

                foreach ($filteredFamilies as $family) {
                    $employee->familyMembers()->updateOrCreate(
                        ['id' => $family['id'] ?? null],
                        $family
                    );
                }
            } else {
                $employee->familyMembers()->delete();
            }

            // ၅။ ပြစ်ဒဏ် / အရေးယူမှုမှတ်တမ်း
            if (isset($validated['legal_records'])) {
                $filteredLog = array_filter($validated['legal_records'], fn($item) => !empty($item['reason']));
                $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
                $employee->courtDisciplinaryActions()->whereNotIn('id', $keepIds)->delete();

                foreach ($filteredLog as $log) {
                    $employee->courtDisciplinaryActions()->updateOrCreate(
                        ['id' => $log['id'] ?? null],
                        $log
                    );
                }
            } else {
                $employee->courtDisciplinaryActions()->delete();
            }

            // ၆။ ဆုလာဘ်မှတ်တမ်း
            if (isset($validated['awards'])) {
                $filteredAwards = array_filter($validated['awards'], fn($item) => !empty($item['award_title']));
                $keepIds = collect($filteredAwards)->pluck('id')->filter()->toArray();
                $employee->awardsReceived()->whereNotIn('id', $keepIds)->delete();

                foreach ($filteredAwards as $award) {
                    $employee->awardsReceived()->updateOrCreate(
                        ['id' => $award['id'] ?? null],
                        $award
                    );
                }
            } else {
                $employee->awardsReceived()->delete();
            }

         // abroad visits
            if (isset($validated['abroad_visits'])) {
                $filteredLog = array_filter($validated['abroad_visits'], fn($item) => !empty($item['country_visited']));
                $keepIds = collect($filteredLog)->pluck('id')->filter()->toArray();
                $employee->abroadVisits()->whereNotIn('id', $keepIds)->delete();

                foreach ($filteredLog as $log) {
                    $employee->abroadVisits()->updateOrCreate(
                        ['id' => $log['id'] ?? null],
                        $log
                    );
                }
            } else {
                $employee->abroadVisits()->delete();
            }

            // အချက်အလက်အားလုံး အောင်မြင်ပါက Commit လုပ်ခြင်း
            DB::commit();


            if ($newImagePath && $oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            } // confirm delete old image
            return redirect()->route('employees.index')->with('success', 'ဝန်ထမ်း၏ အချက်အလက်စုံလင် Mega Form ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီဗျာ။');
        } catch (\Exception $e) {
            // အမှားတစ်ခုခုရှိခဲ့ပါက ဒေတာများမပျက်စီးအောင် နောက်ပြန်ဆုတ်ခြင်း (Rollback)
            DB::rollBack();

            if (isset($path) && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // delete image if transition
            }
            Log::error('Employee Update Error: ' . $e->getMessage()); 

    return redirect()->back()
        ->withInput()
        ->withErrors(['error' => 'အချက်အလက်များ သိမ်းဆည်းစဉ် စနစ်ချို့ယွင်းမှုတစ်ခု ဖြစ်ပွားခဲ့ပါသည်။ ကျေးဇူးပြု၍ ထည့်သွင်းထားသော အချက်အလက်များ မှန်ကန်မှု ရှိ/မရှိ ပြန်လည်စစ်ဆေးပေးပါဗျာ။']);
        }
    }
 
    public function  format25Page(Request $request)  {
 
        $employees = Employee::query()
        ->with([
            'physical',
            'info',
            'employment',
            'educations',
            'trainings',
            'familyMembers',
            'foreignVisitedPurpose',
            'courtDisciplinaryActions',
            'criminalRecords',
            'serviceRecords',
            'awardsReceived',
            'abroadVisits'
        ])
        
        ->orderBy('staff_number', 'asc') // သို့မဟုတ် ->orderBy('staff_number', 'asc') ဆရာ ကြိုက်သလို ပြောင်းနိုင်ပါသည်
        ->get(); // ဝန်ထမ်းအားလုံးကို Report ထုတ်မည် ဖြစ်၍ Pagination မသုံးဘဲ ->get() ယူပါသည်

    return Inertia::render('Staff/Format25Page', [
        'employees' => $employees
    ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return redirect()->route('employees.index')->with('success', 'ဝန်ထမ်းကို ဒေတာဘေ့စ်ထဲမှ ပယ်ဖျက်ပြီးပါပြီ။');
    }
}
