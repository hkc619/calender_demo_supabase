import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: 取得所有事件
export async function GET() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_time", { ascending: true });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: 新增事件
export async function POST(req: Request) {
  const { title, mealType, startTime, endTime, mealItems } = await req.json();
  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        title,
        meal_type: mealType,
        start_time: startTime,
        end_time: endTime,
        meal_items: mealItems,
      },
    ])
    .select();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// PATCH: 更新完成狀態
export async function PATCH(req: Request) {
  const { id, completed } = await req.json();
  const { data, error } = await supabase
    .from("events")
    .update({ completed })
    .eq("id", id)
    .select();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// DELETE: 刪除事件
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted" });
}
