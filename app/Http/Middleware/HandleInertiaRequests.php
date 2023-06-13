<?php

namespace App\Http\Middleware;

use App\Http\Resources\InformasiResource;
use App\Models\Informasi;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $profile = [];
        $roles = [];
        if ($request->user()) {
            // dd($request->user()->getRoleNames());
            if ($request->user()->getRoleNames()[0] !== 'anggota') {

                $profile = $request->user()->profile_petugas;
                // dd($profile);
            } else {

                $profile = $request->user()->profile_anggota;
            }
            $roles =$request->user()->getRoleNames()[0];
        }
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'profile' => $profile,
                'roles' => $roles
            ],

            'flash' => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message')
            ],

            'informasi_update' => InformasiResource::collection(Informasi::with('profile_petugas')->latest()->fastPaginate(3)),

            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}