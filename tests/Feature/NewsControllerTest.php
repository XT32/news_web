<?php


use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\News;

class NewsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_get_popular_news_admin()
    {
        $admin = User::where('role', 'admin')->first();
        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/admin/top-news');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'title', 'traffic_count', 'likes_count', 'comments_count', 'shares_count', 'employee_name']
        ]);
    }

    public function test_get_employee_performance_admin()
    {
        $admin = User::where('role', 'admin')->first();
        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/admin/employee-stats');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'name', 'email', 'news_count', 'total_views', 'total_likes', 'total_comments', 'total_shares']
        ]);
    }

    public function test_get_all_news_public()
    {
        $response = $this->getJson('/api/news');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'title', 'summary', 'url', 'created_at']
        ]);
    }

    public function test_get_employee_news_authenticated()
    {
        $employee = User::where('role', 'karyawan')->first();
        $response = $this->actingAs($employee, 'sanctum')->getJson('/api/employee/news');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'title', 'likes_count', 'comments_count', 'shares_count', 'traffic_count']
        ]);
    }
}
