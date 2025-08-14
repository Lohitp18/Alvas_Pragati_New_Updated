import { Request, Response } from 'express';
import Company from '../models/company';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addCompany = async (req: Request, res: Response) => {
  try {
    const { name, sector, openings } = req.body;
    const company = new Company({ name, sector, openings });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
