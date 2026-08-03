"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";

export function PropertyFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") ?? "",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) params.set("searchTerm", searchTerm);
    else params.delete("searchTerm");
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky top-20 space-y-6 rounded-xl border p-5"
    >
      <div className="flex items-center gap-2 font-semibold">
        <SlidersHorizontal className="size-4" />
        Filters
      </div>

      <div className="space-y-2">
        <Label htmlFor="searchTerm">Search</Label>
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Title, location..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={searchParams.get("categoryId") ?? "all"}
          onValueChange={(v) => updateParam("categoryId", v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-full" type="button">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Price range (per month)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select
          value={searchParams.get("sortBy") ?? "createdAt"}
          onValueChange={(v) => updateParam("sortBy", v)}
        >
          <SelectTrigger type="button" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Newest</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="bedrooms">Bedrooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Apply filters
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() => {
          setSearchTerm("");
          setMinPrice("");
          setMaxPrice("");
          router.push(pathname);
        }}
      >
        Clear all
      </Button>
    </form>
  );
}
