using KnockoutValidationExmp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KnockoutValidationExmp.Controllers
{
    public class HomeController : Controller
    {
        DatabaseFirstDbEntities _db = new DatabaseFirstDbEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        
        [HttpPost]
        public ActionResult Create(tblCustomerRec obj)
        {
            
            if(obj.Id!=0){
               var res= _db.tblCustomerRecs.Where(x=>x.Id==obj.Id).FirstOrDefault();
                if(res!=null)
                {
                    res.Name = obj.Name;
                    res.Address = obj.Address;
                    _db.SaveChanges();
                } 
            }
            else
            {
                _db.tblCustomerRecs.Add(obj);
                _db.SaveChanges();
            }
            
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ListCustomer()
        {
            var list = _db.tblCustomerRecs.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public ActionResult Delete(long Id)
        {
            var getRec = _db.tblCustomerRecs.Find(Id);
               _db.tblCustomerRecs.Remove(getRec);
               _db.SaveChanges();
            return ListCustomer();
        }
        [HttpGet]
         public JsonResult Edit(int Id)
        {
            var getrec= _db.tblCustomerRecs.Find(Id);
            return Json(getrec, JsonRequestBehavior.AllowGet);
        }
    }
}