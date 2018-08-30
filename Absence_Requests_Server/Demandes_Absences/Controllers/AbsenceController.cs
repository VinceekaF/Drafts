using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Demandes_Absences.BL;
using Demandes_Absences.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Demandes_Absences.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AbsenceController : ControllerBase
    {
        IAbsenceBO bo = new AbsenceBO();

        [HttpGet("[action]")]
        public List<Absence> GetAllAbsences()
        {
            return bo.GetAllAbsence().ToList();
        }

        [HttpGet("[action]")]
        public List<Absence> SortByEmissionDate()
        {
            return bo.SortByEmissionDate().ToList();
        }

        [HttpGet("[action]")]
        public List<Absence> SortByStartDate()
        {
            return bo.SortByStartDate().ToList();
        }

        [HttpGet("FilterByReason")]
        public List<Absence> FilterByReason(string reason)
        {
            return bo.FilterByReason(reason).ToList();
        }

        [HttpGet("[action]")]
        public IEnumerable<string> GetReasons()
        {
            return bo.GetReasons();
        }

        
    }
}
