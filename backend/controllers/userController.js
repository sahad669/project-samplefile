import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

//register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashpass,
    });

    const token = jwt.sign(
      { _id: newUser._id, name: newUser.name,role: newUser.role  },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );
    res.status(201).json({ message: "Registered successfully",token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password is wrong" });
    }

    
    const token = jwt.sign(
      { _id: user._id, name: user.name,role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        role:user.role
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({
        message: "all feilds are requierd",
      });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newEmployee = await userModel.create({
      name,
      email,
      password: hashedPass,
      role,
      department,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const filter = { role: "employee" };
    const employees = await userModel.find(filter);

    if (employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found" });
    }

    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedemployee = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedemployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({
      message: "employee updated successfully",
      updatedemployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await userModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await userModel.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

