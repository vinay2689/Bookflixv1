import { useState } from "react";
import { Save, CloudUpload, Bold, Italic, Underline, List, ListOrdered, Quote, Undo, Redo, Image, Video, Globe, CheckCircle, SpellCheck, BarChart, Clock, Users, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const creatorTabs = [
  { id: "write", label: "Write", icon: <Bold className="mr-2 h-4 w-4" /> },
  { id: "cover", label: "Design Cover", icon: <Image className="mr-2 h-4 w-4" /> },
  { id: "trailer", label: "Create Trailer", icon: <Video className="mr-2 h-4 w-4" /> },
  { id: "publish", label: "Publish", icon: <Globe className="mr-2 h-4 w-4" /> },
];

export default function CreatorMode() {
  const [activeTab, setActiveTab] = useState("write");
  const [bookTitle, setBookTitle] = useState("");
  const [currentChapter, setCurrentChapter] = useState("Chapter 1");
  const [chapterContent, setChapterContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (content: string) => {
    setChapterContent(content);
    setWordCount(content.split(/\s+/).filter(word => word.length > 0).length);
  };

  const calculateReadingTime = (words: number) => {
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Creator Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white">Create Your Book</h2>
        <p className="text-gray-400">Bring your story to life with our comprehensive creation tools</p>
      </div>

      {/* Creator Tabs */}
      <div className="flex border-b border-dark-border mb-8">
        {creatorTabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium border-b-2 rounded-none ${
              activeTab === tab.id
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Creator Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tools */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold mb-4 text-white">Writing Tools</h3>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start p-3 rounded-lg hover:bg-gray-700 text-green-400"
              >
                <Save className="mr-3 h-4 w-4" />
                Auto-Save: On
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start p-3 rounded-lg hover:bg-gray-700 text-blue-400"
              >
                <CheckCircle className="mr-3 h-4 w-4" />
                Grammar Check
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start p-3 rounded-lg hover:bg-gray-700 text-purple-400"
              >
                <BarChart className="mr-3 h-4 w-4" />
                Word Count: {wordCount}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start p-3 rounded-lg hover:bg-gray-700 text-yellow-400"
              >
                <Clock className="mr-3 h-4 w-4" />
                Reading Time: {calculateReadingTime(wordCount)} min
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start p-3 rounded-lg hover:bg-gray-700 text-pink-400"
              >
                <Users className="mr-3 h-4 w-4" />
                Collaborate
              </Button>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-white">AI Assistant</h4>
              <Button className="w-full bg-brand-orange text-white hover:bg-orange-600">
                <Bot className="mr-2 h-4 w-4" />
                Get Writing Help
              </Button>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-3">
          <div className="bg-dark-card rounded-xl">
            {/* Editor Toolbar */}
            <div className="border-b border-dark-border p-4">
              <div className="flex items-center justify-between mb-4">
                <Input
                  type="text"
                  placeholder="Enter your book title..."
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="text-2xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1 mr-4"
                />
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <Select value={currentChapter} onValueChange={setCurrentChapter}>
                  <SelectTrigger className="w-40 bg-dark-bg border-dark-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chapter 1">Chapter 1</SelectItem>
                    <SelectItem value="Chapter 2">Chapter 2</SelectItem>
                    <SelectItem value="+ New Chapter">+ New Chapter</SelectItem>
                  </SelectContent>
                </Select>
                <div className="h-6 w-px bg-gray-600"></div>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-600"></div>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <Quote className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-600"></div>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Writing Area */}
            <div className="p-6">
              <Textarea
                value={chapterContent}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Once upon a time..."
                className="w-full h-96 bg-transparent border-none outline-none text-white resize-none text-lg leading-relaxed"
              />
            </div>

            {/* Chapter Navigation */}
            <div className="border-t border-dark-border p-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Previous Chapter
                </Button>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">Words: {wordCount}</span>
                  <span className="text-sm text-gray-400">Characters: {chapterContent.length}</span>
                  <span className="text-sm text-gray-400">
                    Reading time: {calculateReadingTime(wordCount)} min
                  </span>
                </div>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Next Chapter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
