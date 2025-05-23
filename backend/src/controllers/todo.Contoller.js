import { supabase } from "../db/supabaseClient.js";

export const addTodo = async (req, res) => {
    const { title, description } = req.body;

    try {
        const resposne = await supabase.from("todoAssistant").insert([{title: title,text: description, completed:false }]).select()
  .single();
        // if (error) {
        //     throw new Error(error || "Error in adding the todo.")
        // }
        if (resposne.error) throw error;
        return res.status(200).json({ data:resposne.data })
    } catch (error) {
        return res.status(500).json({ data: "", error: error.message || "Internal Server Error" });
    }
}

export const getPost = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("todoAssistant")
      .select("*")
    //   .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message || "Error in returning the todo.");
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({
      data: "",
      error: error.message || "Internal Server Error",
    });
  }
};


export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const { error, data } = await supabase.from("todoAssistant").delete().eq("id", id)
        if (error) {
            throw new Error(error || "Error in deleting the todo.")
        }
        return res.status(200).json({ data: data, error: "" })

    } catch (error) {
        return res.status(500).json({ data: "", error: error.message || "Internal Server Error" });
    }
}

export const editPost = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const { error, data } = await supabase.from("todoAssistant").update({ title: title,text: description, completed:status }).eq("id", id).select();
        if (error) {
            throw new Error(error || "Error in deleting the todo.")
        }
        return res.status(200).json({ data: data, error: "" })
    } catch (error) {
        return res.status(500).json({ data: "", error: error.message || "Internal Server Error" });
    }
}