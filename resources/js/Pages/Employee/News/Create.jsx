import React, { useState, useRef } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { 
    PlusIcon, 
    PhotoIcon, 
    DocumentTextIcon, 
    EyeIcon, 
    XMarkIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function EmployeeNewsCreate() {
    const { props } = usePage();
    const { categories, auth, errors } = props;
    
    const [data, setData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        thumbnail: null,
        meta_description: '',
        meta_keywords: '',
        status: 'draft',
        categories: []
    });

    const [processing, setProcessing] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [charCount, setCharCount] = useState({ 
        excerpt: 0, 
        meta_description: 0,
        title: 0 
    });
    const [activeTab, setActiveTab] = useState('content');
    const fileInputRef = useRef(null);

    // Auto-generate slug from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 100);
    };

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setData(prev => {
            const newData = { ...prev, [field]: value };
            
            // Auto-generate slug when title changes
            if (field === 'title') {
                newData.slug = generateSlug(value);
                setCharCount(prev => ({ ...prev, title: value.length }));
            }
            
            return newData;
        });

        // Update character counts
        if (field === 'excerpt') {
            setCharCount(prev => ({ ...prev, excerpt: value.length }));
        }
        if (field === 'meta_description') {
            setCharCount(prev => ({ ...prev, meta_description: value.length }));
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                alert('⚠️ Please select a valid image file (JPEG, PNG, or WebP)');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('⚠️ File size must be less than 5MB');
                return;
            }

            setData(prev => ({ ...prev, thumbnail: file }));
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => setThumbnailPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    // Remove uploaded image
    const removeImage = () => {
        setData(prev => ({ ...prev, thumbnail: null }));
        setThumbnailPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        setData(prev => ({
            ...prev,
            categories: prev.categories.includes(categoryId)
                ? prev.categories.filter(id => id !== categoryId)
                : [...prev.categories, categoryId]
        }));
    };

    // Form validation
    const validateForm = () => {
        const errors = [];
        
        if (!data.title.trim()) errors.push('Title is required');
        if (data.title.length > 200) errors.push('Title must be less than 200 characters');
        if (!data.content.trim()) errors.push('Content is required');
        if (data.content.length < 100) errors.push('Content must be at least 100 characters');
        if (data.excerpt.length > 300) errors.push('Excerpt must be less than 300 characters');
        if (data.meta_description.length > 160) errors.push('Meta description must be less than 160 characters');
        
        return errors;
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            alert('❌ Please fix the following errors:\n\n' + validationErrors.join('\n'));
            return;
        }

        setProcessing(true);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('excerpt', data.excerpt);
        formData.append('content', data.content);
        formData.append('meta_description', data.meta_description);
        formData.append('meta_keywords', data.meta_keywords);
        formData.append('status', data.status);
        
        if (data.thumbnail) {
            formData.append('thumbnail', data.thumbnail);
        }
        
        data.categories.forEach(categoryId => {
            formData.append('categories[]', categoryId);
        });

        router.post('/employee/news', formData, {
            onFinish: () => setProcessing(false),
            onSuccess: () => {
                alert('✅ Article created successfully!');
                // Reset form on success
                setData({
                    title: '',
                    slug: '',
                    excerpt: '',
                    content: '',
                    thumbnail: null,
                    meta_description: '',
                    meta_keywords: '',
                    status: 'draft',
                    categories: []
                });
                setThumbnailPreview(null);
                setCharCount({ excerpt: 0, meta_description: 0, title: 0 });
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
                alert('❌ There was an error creating the article. Please check the form and try again.');
            }
        });
    };

    const tabs = [
        { key: 'content', label: 'Content', icon: DocumentTextIcon },
        { key: 'media', label: 'Media & SEO', icon: PhotoIcon },
    ];

    return (
        <>
            <Head title="Create Article - Employee Portal" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                    Laravel News
                                </Link>
                                <span className="text-sm text-gray-500 border-l pl-4">Employee Portal</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        {auth?.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-gray-700">Welcome, {auth?.user?.name}</span>
                                </div>
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    View Site
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Navigation Breadcrumb */}
                    <nav className="mb-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Link href="/employee/dashboard" className="hover:text-blue-600">Dashboard</Link>
                            <span>/</span>
                            <Link href="/employee/news" className="hover:text-blue-600">Articles</Link>
                            <span>/</span>
                            <span className="text-gray-900">Create New</span>
                        </div>
                    </nav>

                    {/* Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <PlusIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
                                <p className="mt-1 text-gray-600">
                                    Share your story with the world. Write engaging content with built-in SEO optimization.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200 bg-gray-50">
                            <nav className="flex space-x-8 px-6">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                                                activeTab === tab.key
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Content Tab */}
                            {activeTab === 'content' && (
                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Article Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter a compelling title for your article..."
                                            required
                                        />
                                        <div className="flex justify-between mt-1">
                                            <div className="text-xs text-gray-500">
                                                This will be the main headline readers see
                                            </div>
                                            <div className={`text-xs ${charCount.title > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                                                {charCount.title}/200
                                            </div>
                                        </div>
                                        {errors?.title && <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                            {errors.title}
                                        </p>}
                                    </div>

                                    {/* URL Slug */}
                                    <div>
                                        <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
                                            URL Slug *
                                        </label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 py-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                /news/
                                            </span>
                                            <input
                                                type="text"
                                                id="slug"
                                                value={data.slug}
                                                onChange={(e) => setData({ ...data, slug: e.target.value })}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500 flex items-center">
                                            <InformationCircleIcon className="w-4 h-4 mr-1" />
                                            This creates your article's web address. It updates automatically from your title.
                                        </p>
                                        {errors?.slug && <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                            {errors.slug}
                                        </p>}
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Article Summary
                                        </label>
                                        <textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Write a brief, engaging summary that will appear in article previews and search results..."
                                        />
                                        <div className="flex justify-between mt-1">
                                            <div className="text-xs text-gray-500">
                                                This appears in article previews and social media shares
                                            </div>
                                            <div className={`text-xs ${charCount.excerpt > 300 ? 'text-red-500' : 'text-gray-500'}`}>
                                                {charCount.excerpt}/300
                                            </div>
                                        </div>
                                        {errors?.excerpt && <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                            {errors.excerpt}
                                        </p>}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Article Content *
                                        </label>
                                        <textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            rows="16"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                                            placeholder="Write your article content here. Be descriptive, engaging, and informative. Consider using paragraphs, bullet points, and clear structure to make it easy to read..."
                                            required
                                        />
                                        <div className="flex justify-between mt-1">
                                            <div className="text-xs text-gray-500">
                                                Minimum 100 characters recommended for good SEO
                                            </div>
                                            <div className={`text-xs ${data.content.length < 100 ? 'text-orange-500' : 'text-green-600'}`}>
                                                {data.content.length} characters
                                            </div>
                                        </div>
                                        {errors?.content && <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                            {errors.content}
                                        </p>}
                                    </div>

                                    {/* Categories */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Categories
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {categories?.map((category) => (
                                                <label key={category.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.categories.includes(category.id)}
                                                        onChange={() => handleCategoryChange(category.id)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-3 text-sm text-gray-700 font-medium">{category.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            Select categories that best describe your article content
                                        </p>
                                        {errors?.categories && <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                            {errors.categories}
                                        </p>}
                                    </div>
                                </div>
                            )}
                            {/* Media & SEO Tab */}
                            {activeTab === 'media' && (
                                <div className="space-y-6">
                                    {/* Thumbnail Upload */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Article Thumbnail
                                        </label>
                                        
                                        {!thumbnailPreview ? (
                                            <div 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group"
                                            >
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                                        Click to upload a thumbnail image
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        PNG, JPG, WebP up to 5MB • Recommended: 1200x630px
                                                    </p>
                                                </div>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <div className="relative overflow-hidden rounded-xl border border-gray-200">
                                                    <img 
                                                        src={thumbnailPreview} 
                                                        alt="Thumbnail preview" 
                                                        className="w-full h-64 object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                                                        >
                                                            <XMarkIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center"
                                                >
                                                    <PhotoIcon className="w-4 h-4 mr-1" />
                                                    Change image
                                                </button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                        )}
                                        
                                        <p className="mt-2 text-xs text-gray-500 flex items-center">
                                            <InformationCircleIcon className="w-4 h-4 mr-1" />
                                            This image appears when your article is shared on social media and in article previews
                                        </p>
                                        {errors?.thumbnail && <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                            {errors.thumbnail}
                                        </p>}
                                    </div>

                                    {/* SEO Section */}
                                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <EyeIcon className="w-5 h-5 mr-2 text-blue-600" />
                                            Search Engine Optimization (SEO)
                                        </h3>

                                        {/* Meta Description */}
                                        <div className="mb-4">
                                            <label htmlFor="meta_description" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Meta Description
                                            </label>
                                            <textarea
                                                id="meta_description"
                                                value={data.meta_description}
                                                onChange={(e) => handleInputChange('meta_description', e.target.value)}
                                                rows="2"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                                placeholder="A concise description that appears in search engine results. Make it compelling to encourage clicks..."
                                            />
                                            <div className="flex justify-between mt-1">
                                                <div className="text-xs text-gray-500">
                                                    This appears in Google search results under your title
                                                </div>
                                                <div className={`text-xs ${charCount.meta_description > 160 ? 'text-red-500' : charCount.meta_description > 120 ? 'text-orange-500' : 'text-green-600'}`}>
                                                    {charCount.meta_description}/160
                                                </div>
                                            </div>
                                        </div>

                                        {/* Meta Keywords */}
                                        <div>
                                            <label htmlFor="meta_keywords" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Focus Keywords
                                            </label>
                                            <input
                                                type="text"
                                                id="meta_keywords"
                                                value={data.meta_keywords}
                                                onChange={(e) => setData({ ...data, meta_keywords: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Enter keywords separated by commas (e.g., technology, innovation, software)"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Add relevant keywords that people might search for to find this article
                                            </p>
                                        </div>
                                    </div>

                                    {/* Publication Status */}
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3">
                                            Publication Status
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${data.status === 'draft' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="draft"
                                                    checked={data.status === 'draft'}
                                                    onChange={(e) => setData({ ...data, status: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">Save as Draft</span>
                                                    <span className="block text-sm text-gray-500">Keep private for now</span>
                                                </div>
                                                {data.status === 'draft' && (
                                                    <CheckCircleIcon className="h-5 w-5 text-blue-600 absolute top-4 right-4" />
                                                )}
                                            </label>
                                            <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${data.status === 'published' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="published"
                                                    checked={data.status === 'published'}
                                                    onChange={(e) => setData({ ...data, status: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">Publish Now</span>
                                                    <span className="block text-sm text-gray-500">Make it live immediately</span>
                                                </div>
                                                {data.status === 'published' && (
                                                    <CheckCircleIcon className="h-5 w-5 text-green-600 absolute top-4 right-4" />
                                                )}
                                            </label>
                                        </div>
                                        {errors?.status && <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                            {errors.status}
                                        </p>}
                                    </div>
                                </div>
                            )}

                            {/* Submit Buttons */}
                            <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
                                <Link
                                    href="/employee/news"
                                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center space-x-2"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                    <span>Cancel</span>
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 shadow-lg"
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleIcon className="w-4 h-4" />
                                            <span>Create Article</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                        <h3 className="text-lg font-semibold text-amber-900 mb-2">💡 Writing Tips</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-800">
                            <div>
                                <h4 className="font-medium mb-1">Content Quality:</h4>
                                <ul className="space-y-1 text-xs">
                                    <li>• Write at least 300 words for better SEO</li>
                                    <li>• Use clear, engaging headlines</li>
                                    <li>• Break content into readable paragraphs</li>
                                    <li>• Include relevant keywords naturally</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-1">SEO Optimization:</h4>
                                <ul className="space-y-1 text-xs">
                                    <li>• Keep meta description under 160 characters</li>
                                    <li>• Use high-quality, relevant images</li>
                                    <li>• Choose descriptive, keyword-rich titles</li>
                                    <li>• Select appropriate categories</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
