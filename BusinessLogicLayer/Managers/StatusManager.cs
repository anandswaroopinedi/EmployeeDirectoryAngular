using AutoMapper;
using DataAccessLayer.Interface;
using Models;
using BusinessLogicLayer.Interfaces;

namespace BusinessLogicLayer.Managers
{
    public class StatusManager : IStatusManager
    {
        private readonly IDataOperations _dataOperations;
        private readonly IMapper _mapper;

        public StatusManager(IDataOperations dataOperations, IMapper mapper)
        {
            _dataOperations = dataOperations;
            _mapper = mapper;
        }
        public async Task<List<Status>> GetStatuses()
        {
            return _mapper.Map<List<Status>>(await _dataOperations.GetStatuses());
        }
    }
}
