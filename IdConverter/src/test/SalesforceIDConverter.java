package test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;


public class SalesforceIDConverter {
	public static String convertID(String id) {
		if (id.length() == 18)
			return id;

		String suffix = "";
		for (int i = 0; i < 3; i++) {

			Integer flags = 0;

			for (int j = 0; j < 5; j++) {
				String c = id.substring(i * 5 + j, i * 5 + j + 1);

				if (c.compareTo("A") >= 0 && c.compareTo("Z") <= 0) {

					flags += 1 << j;
				}
			}

			if (flags <= 25) {

				suffix += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(flags, flags + 1);

			} else
				suffix += "012345".substring(flags - 26, flags - 26 + 1);
		}

		return id + suffix;
	}

	public static void main(String[] args) {
		
		try {
			ReadColumn();
		} catch (BiffException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (RowsExceededException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (WriteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private static void  ReadColumn() throws BiffException, IOException, RowsExceededException, WriteException{
		 Workbook workbook = Workbook.getWorkbook(new File("C:/JXL/Test.xls"));

		    Sheet firstSheet = workbook.getSheet(0); 
		    System.out.println("Rows in first sheet : " + firstSheet.getRows());
		    System.out.println("Columns in first sheet : " + firstSheet.getColumns());
		    System.out.println();
		    
		    
		    File f = new File("CONVERTED.xls");
		    if(!f.exists()){
		    	f.delete();
		    }
		    	WritableWorkbook newwb = Workbook.createWorkbook(new File("CONVERTED.xls"));
		    	WritableSheet writableSheet = newwb.createSheet(
	                    "Sheet1", 0);
		    
		    int counter = 1;
		    for (int row = 0 ; row < firstSheet.getRows(); row ++ ) {
		        String test = firstSheet.getCell(0, row).getContents();
		       
		        if(test.length() == 15){
		        	convertID(test);
		        	System.out.println(test + "\t\t" + convertID(test));
		        	writableSheet.addCell(new Label(0,counter,test));
		        	writableSheet.addCell(new Label(1,counter,convertID(test)));
		        	counter++;
		        }
		        
		    }
		    newwb.write();
		    newwb.close();
		    workbook.close(); 
		  }

}
