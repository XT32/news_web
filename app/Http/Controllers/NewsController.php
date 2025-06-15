<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsArticle;
use GuzzleHttp\Client;

class NewsController extends Controller
{
    private $newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=' . env('NEWS_API_KEY');

    public function fetchNews(Request $request)
    {
        try {
            $client = new Client();
            $response = $client->get($this->newsApiUrl);
            $apiData = json_decode($response->getBody()->getContents(), true);

            if (isset($apiData['articles']) && count($apiData['articles']) > 0) {
                foreach ($apiData['articles'] as $article) {
                    NewsArticle::updateOrCreate(
                        ['title' => $article['title']],
                        [
                            'title' => $article['title'],
                            'description' => $article['description'],
                            'url' => $article['url'],
                            'image_url' => $article['urlToImage'],
                            'published_at' => $article['publishedAt'],
                            'source_name' => $article['source']['name'],
                        ]
                    );
                }
            }

            $allNews = NewsArticle::all();

            return response()->json($allNews);
        } catch (\Exception $e) {
            // Handle API request failure
            return response()->json(['error' => 'Unable to fetch news: ' . $e->getMessage()], 500);
        }
    }
    public function uploadNews(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|url',
            'published_at' => 'required|date',
        ]);
        $news = NewsArticle::create([
            'title' => $request->title,
            'description' => $request->description,
            'image_url' => $request->image_url,
            'published_at' => $request->published_at,
            'source_name' => 'Uploaded',
        ]);

        return response()->json($news, 201);
    }
}